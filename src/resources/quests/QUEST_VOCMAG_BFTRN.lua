QUEST_VOCMAG_BFTRN = {
	title = 'IDS_PROPQUEST_INC_000772',
	character = 'MaSa_Wingyei',
	end_character = 'MaSa_Wingyei',
	start_requirements = {
		min_level = 15,
		max_level = 15,
		job = { 'JOB_VAGRANT' },
		previous_quest = '',
	},
	rewards = {
		gold = 1500,
		exp = 0,
		items = {
			{ id = 'II_SYS_BLI_BLI_FLARIS', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		monsters = {
			{ id = 'MI_AIBATT3', quantity = 10 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000773',
			'IDS_PROPQUEST_INC_000774',
			'IDS_PROPQUEST_INC_000775',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000776',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000777',
		},
		completed = {
			'IDS_PROPQUEST_INC_000778',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000779',
		},
	}
}
