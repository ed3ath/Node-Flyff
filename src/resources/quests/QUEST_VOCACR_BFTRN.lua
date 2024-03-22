QUEST_VOCACR_BFTRN = {
	title = 'IDS_PROPQUEST_INC_000469',
	character = 'MaDa_Hent',
	end_character = 'MaDa_Hent',
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
			{ id = 'MI_AIBATT1', quantity = 10 },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000470',
			'IDS_PROPQUEST_INC_000471',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000472',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000473',
		},
		completed = {
			'IDS_PROPQUEST_INC_000474',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000475',
		},
	}
}
