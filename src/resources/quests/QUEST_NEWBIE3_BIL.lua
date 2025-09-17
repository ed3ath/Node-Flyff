QUEST_NEWBIE3_BIL = {
	title = 'IDS_PROPQUEST_INC_002720',
	character = 'MaFl_Newbie',
	end_character = 'MaFl_Newbie',
	start_requirements = {
		min_level = 75,
		max_level = 129,
		job = { 'JOB_BILLPOSTER', 'JOB_BILLPOSTER_MASTER', 'JOB_BILLPOSTER_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_EVE_BXMBILLPOSTER90', quantity = 1, sex = 'Male' },
			{ id = 'II_SYS_SYS_EVE_BXFBILLPOSTER90', quantity = 1, sex = 'Female' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_EVE_NEWBIE03', quantity = 1, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_002721',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_002722',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_002723',
		},
		completed = {
			'IDS_PROPQUEST_INC_002724',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_002725',
		},
	}
}
