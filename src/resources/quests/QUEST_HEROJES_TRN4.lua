QUEST_HEROJES_TRN4 = {
	title = 'IDS_PROPQUEST_INC_000546',
	character = 'MaSa_Troupemember5',
	end_character = 'MaDa_Homeit',
	start_requirements = {
		min_level = 60,
		max_level = 60,
		job = { 'JOB_ACROBAT' },
		previous_quest = 'QUEST_HEROJES_TRN3',
	},
	rewards = {
		gold = 0,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_HEROMARK', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
		items = {
			{ id = 'II_SYS_SYS_QUE_HEROSOUL01', quantity = 1, sex = 'Any', remove = true },
		},
		monsters = {
			{ id = 'MI_SISIF', quantity = 1 },
		},
	},
	drops = {
		{ item_id = 'II_SYS_SYS_QUE_HEROSOUL01', monster_id = 'MI_SISIF', probability = '3000000000' },
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000547',
			'IDS_PROPQUEST_INC_000548',
			'IDS_PROPQUEST_INC_000549',
			'IDS_PROPQUEST_INC_000550',
			'IDS_PROPQUEST_INC_000551',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000552',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000553',
		},
		completed = {
			'IDS_PROPQUEST_INC_000554',
			'IDS_PROPQUEST_INC_000555',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000556',
		},
	}
}
