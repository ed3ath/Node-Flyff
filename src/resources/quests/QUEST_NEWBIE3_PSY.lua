QUEST_NEWBIE3_PSY = {
	title = 'IDS_PROPQUEST_INC_002760',
	character = 'MaFl_Newbie',
	end_character = 'MaFl_Newbie',
	start_requirements = {
		min_level = 75,
		max_level = 129,
		job = { 'JOB_PSYCHIKEEPER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_PSYCHIKEEPER_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_EVE_BXMPSYCHIKEEPER90', quantity = 1, sex = 'Male' },
			{ id = 'II_SYS_SYS_EVE_BXFPSYCHIKEEPER90', quantity = 1, sex = 'Female' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_NEWBIE03', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002761',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002762',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002763',
		},
		completed = {
			'IDS_PROPQUEST_INC_002764',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002765',
		},
	}
}
